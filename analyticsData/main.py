import json
import sys
import traceback
from datetime import datetime
from pathlib import Path

import numpy as np
import pandas as pd


def calculate_growth_rate(series: pd.Series) -> dict:
    """成長率を計算"""
    if len(series) < 2:
        return {"成長率": 0.0, "成長率_パーセント": 0.0}

    first_value = series.iloc[0]
    last_value = series.iloc[-1]

    if first_value == 0:
        growth_rate = float("inf") if last_value > 0 else 0.0
    else:
        growth_rate = (last_value - first_value) / first_value

    return {
        "成長率": float(growth_rate) if not np.isinf(growth_rate) else None,
        "成長率_パーセント": float(growth_rate * 100)
        if not np.isinf(growth_rate)
        else None,
    }


def analyze_time_series(df: pd.DataFrame, numeric_cols: pd.Index) -> dict:
    """時系列分析"""
    df_copy = df.copy()
    df_copy["年"] = df_copy["日付"].dt.year
    df_copy["月"] = df_copy["日付"].dt.to_period("M")
    df_copy["週"] = df_copy["日付"].dt.to_period("W")

    # 日次統計
    daily_total = df_copy[numeric_cols].sum(axis=1)
    daily_stats = {
        "平均": float(daily_total.mean()),
        "中央値": float(daily_total.median()),
        "標準偏差": float(daily_total.std()),
        "最大値": float(daily_total.max()),
        "最小値": float(daily_total.min()),
        "ピーク日": df_copy.loc[daily_total.idxmax(), "日付"].strftime("%Y/%m/%d"),
        "ピーク日_インストール数": int(daily_total.max()),
    }

    # 月別集計
    monthly = df_copy.groupby("月")[numeric_cols].sum().sum(axis=1)
    monthly_data = []
    for period, value in monthly.items():
        monthly_data.append(
            {
                "年月": str(period),
                "総インストール数": int(value),
            }
        )

    # 年別集計
    yearly = df_copy.groupby("年")[numeric_cols].sum().sum(axis=1)
    yearly_data = []
    for year, value in yearly.items():
        yearly_data.append(
            {
                "年": int(year),
                "総インストール数": int(value),
            }
        )

    # 成長率計算（月次）
    if len(monthly_data) >= 2:
        monthly_values = [m["総インストール数"] for m in monthly_data]
        monthly_series = pd.Series(monthly_values)
        monthly_growth = calculate_growth_rate(monthly_series)
    else:
        monthly_growth = {"成長率": None, "成長率_パーセント": None}

    # 成長率計算（年次）
    if len(yearly_data) >= 2:
        yearly_values = [y["総インストール数"] for y in yearly_data]
        yearly_series = pd.Series(yearly_values)
        yearly_growth = calculate_growth_rate(yearly_series)
    else:
        yearly_growth = {"成長率": None, "成長率_パーセント": None}

    return {
        "日次統計": daily_stats,
        "月次集計": monthly_data,
        "年次集計": yearly_data,
        "月次成長率": monthly_growth,
        "年次成長率": yearly_growth,
    }


def analyze_category_statistics(df: pd.DataFrame, numeric_cols: pd.Index) -> dict:
    """カテゴリ別の統計分析"""
    category_stats = {}

    for col in numeric_cols:
        series = df[col]
        total = int(series.sum())

        if total == 0:
            continue

        # 最初と最後の非ゼロ値を取得
        non_zero = series[series > 0]
        if len(non_zero) > 0:
            first_active = non_zero.index[0]
            last_active = non_zero.index[-1]
            first_active_date = df.loc[first_active, "日付"].strftime("%Y/%m/%d")
            last_active_date = df.loc[last_active, "日付"].strftime("%Y/%m/%d")
        else:
            first_active_date = None
            last_active_date = None

        # ピーク日
        peak_idx = series.idxmax()
        peak_date = df.loc[peak_idx, "日付"].strftime("%Y/%m/%d")
        peak_value = int(series.max())

        # 成長率
        growth = calculate_growth_rate(series)

        # 統計値
        stats = {
            "総数": total,
            "平均": float(series.mean()),
            "中央値": float(series.median()),
            "標準偏差": float(series.std()),
            "最大値": peak_value,
            "最小値": int(series.min()),
            "ピーク日": peak_date,
            "最初のアクティブ日": first_active_date,
            "最後のアクティブ日": last_active_date,
            "成長率": growth["成長率"],
            "成長率_パーセント": growth["成長率_パーセント"],
            "非ゼロ日数": int((series > 0).sum()),
            "総日数": len(series),
            "アクティブ率": float((series > 0).sum() / len(series) * 100),
        }

        category_stats[col] = stats

    return category_stats


def get_top_categories(totals: dict, n: int = 10) -> dict:
    """上位Nカテゴリを取得"""
    sorted_categories = sorted(totals.items(), key=lambda x: x[1], reverse=True)
    top_n = sorted_categories[:n]

    return {
        f"上位{n}": [{"カテゴリ": cat, "総数": total} for cat, total in top_n],
        "合計": sum(totals.values()),
        "上位Nの合計": sum(total for _, total in top_n),
        "上位Nの割合_パーセント": (
            sum(total for _, total in top_n) / sum(totals.values()) * 100
            if sum(totals.values()) > 0
            else 0
        ),
    }


def analyze_csv_file(csv_path: Path, download_date: str, execution_date: str):
    """
    CSVファイルを分析して結果を返す

    Args:
        csv_path: CSVファイルのパス
        download_date: ダウンロード日（フォルダ名）
        execution_date: 実行日

    Returns:
        分析結果の辞書
    """
    # CSVファイルを読み込み（1行目はタイトル、2行目がヘッダー）
    df = pd.read_csv(csv_path, skiprows=1, encoding="utf-8")

    # 日付列を日付型に変換
    df["日付"] = pd.to_datetime(df["日付"], format="%Y/%m/%d")

    # 日付の範囲を取得
    date_start = df["日付"].min().strftime("%Y/%m/%d")
    date_end = df["日付"].max().strftime("%Y/%m/%d")
    total_days = (df["日付"].max() - df["日付"].min()).days + 1

    # 日付列以外の列（言語/地域）の総数を計算
    numeric_cols = df.select_dtypes(include=["number"]).columns
    totals = {}
    for col in numeric_cols:
        totals[col] = int(df[col].sum())

    # ファイル名からタイプを判定（言語別 or 地域別）
    file_name = csv_path.name
    if "言語別" in file_name:
        analysis_type = "言語別"
    elif "地域別" in file_name:
        analysis_type = "地域別"
    else:
        analysis_type = "不明"

    # 総インストール数
    total_installs = int(df[numeric_cols].sum().sum())

    # 高度な分析を実行
    time_series_analysis = analyze_time_series(df, numeric_cols)
    category_stats = analyze_category_statistics(df, numeric_cols)
    top_categories = get_top_categories(totals, n=10)

    # 全体統計
    overall_stats = {
        "総インストール数": total_installs,
        "総日数": int(total_days),
        "日次平均インストール数": float(total_installs / total_days)
        if total_days > 0
        else 0.0,
        "カテゴリ数": len([c for c in totals.values() if c > 0]),
        "アクティブカテゴリ数": len([c for c in totals.values() if c > 0]),
    }

    return {
        "実行日": execution_date,
        "ダウンロード日": download_date,
        "分析タイプ": analysis_type,
        "ファイル名": csv_path.name,
        "日付範囲_開始": date_start,
        "日付範囲_終了": date_end,
        "基本情報": {
            "各カテゴリの総数": totals,
            "全体統計": overall_stats,
        },
        "時系列分析": time_series_analysis,
        "カテゴリ別統計": category_stats,
        "上位カテゴリ分析": top_categories,
    }


def find_all_csv_files(data_dir: Path):
    """
    Dataディレクトリ内のすべてのCSVファイルを検索

    Returns:
        (csv_path, download_date)のリスト
    """
    csv_files = []

    # Dataディレクトリ内のすべてのサブディレクトリを検索
    for subdir in data_dir.iterdir():
        if subdir.is_dir():
            download_date = subdir.name

            # サブディレクトリ内のCSVファイルを検索
            for csv_file in subdir.glob("*.csv"):
                csv_files.append((csv_file, download_date))

    return csv_files


def save_results(results: list, output_dir: Path):
    """
    分析結果をJSON形式で保存

    Args:
        results: 分析結果のリスト
        output_dir: 出力ディレクトリ
    """
    output_dir.mkdir(parents=True, exist_ok=True)

    # 全結果をJSONで保存
    json_path = (
        output_dir / f"analysis_all_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    )
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"結果をJSONで保存: {json_path}")


def main():
    """メイン処理"""
    # Windowsでの文字化け対策
    if sys.platform == "win32":
        sys.stdout.reconfigure(encoding="utf-8")

    # 実行日を取得
    execution_date = datetime.now().strftime("%Y/%m/%d %H:%M:%S")

    # Dataディレクトリのパス
    script_dir = Path(__file__).parent
    data_dir = script_dir

    print(f"実行日: {execution_date}")
    print(f"データディレクトリ: {data_dir}")
    print("=" * 60)

    # すべてのCSVファイルを検索
    csv_files = find_all_csv_files(data_dir)

    if not csv_files:
        print("CSVファイルが見つかりませんでした。")
        return

    print(f"見つかったCSVファイル数: {len(csv_files)}")
    print()

    # 各CSVファイルを分析
    results = []
    for csv_path, download_date in csv_files:
        print(f"分析中: {csv_path.name} (ダウンロード日: {download_date})")
        try:
            result = analyze_csv_file(csv_path, download_date, execution_date)
            results.append(result)
            print(
                f"  [OK] 日付範囲: {result['日付範囲_開始']} ～ {result['日付範囲_終了']}"
            )
            overall_stats = result["基本情報"]["全体統計"]
            print(f"  [OK] 総インストール数: {overall_stats['総インストール数']:,}")
            print(
                f"  [OK] 日次平均インストール数: {overall_stats['日次平均インストール数']:.2f}"
            )
            print(
                f"  [OK] アクティブカテゴリ数: {overall_stats['アクティブカテゴリ数']}"
            )

            # 時系列分析のサマリー
            ts = result["時系列分析"]
            print(
                f"  [OK] ピーク日: {ts['日次統計']['ピーク日']} ({ts['日次統計']['ピーク日_インストール数']:,}件)"
            )

        except Exception as e:
            print(f"  [ERROR] エラー: {e}")
            traceback.print_exc()
        print()

    # 結果を保存
    output_dir = data_dir / "analysis_results"
    save_results(results, output_dir)

    print("=" * 60)
    print(f"分析完了！結果は {output_dir} に保存されました。")


if __name__ == "__main__":
    main()
