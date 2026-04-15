"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import styles from "components/catalog/catalog-app.module.css"
import {
  defaultFilters,
  filterOptions,
  type FilterState,
  type ReligionRecord,
} from "lib/religion"

type CatalogAppProps = {
  records: ReligionRecord[]
}

function boolLabel(value: boolean, truthy = "あり", falsy = "なし") {
  return value ? truthy : falsy
}

function joinList(values: string[]) {
  return values.length > 0 ? values.join(" / ") : "特記事項なし"
}

const compareRows: Array<{
  key: string
  label: string
  render: (record: ReligionRecord) => string
}> = [
  { key: "deityType", label: "神タイプ", render: (record) => record.deityType },
  {
    key: "godCharacter",
    label: "神観の特徴",
    render: (record) =>
      `人格性: ${boolLabel(record.hasPersonhood, "あり", "なし")} / 距離感: ${record.distanceToBelievers}`,
  },
  {
    key: "afterlife",
    label: "死後観",
    render: (record) => record.afterlife.join(" / "),
  },
  {
    key: "salvationMethods",
    label: "救済方法",
    render: (record) => joinList(record.salvationMethods),
  },
  {
    key: "disciplineStrictness",
    label: "戒律の厳しさ",
    render: (record) => record.disciplineStrictness,
  },
  {
    key: "practiceBurden",
    label: "実践負荷",
    render: (record) => record.practiceBurden,
  },
  { key: "alcohol", label: "飲酒", render: (record) => record.alcohol },
  {
    key: "communityImportance",
    label: "共同体重視度",
    render: (record) => record.communityImportance,
  },
  {
    key: "worshipFrequency",
    label: "礼拝頻度",
    render: (record) => record.worshipFrequency,
  },
  {
    key: "practiceStyle",
    label: "祈り・実践形式",
    render: (record) => record.prayerStyle,
  },
  {
    key: "diet",
    label: "食事制限",
    render: (record) => joinList(record.dietaryRestrictions),
  },
  {
    key: "marriageView",
    label: "結婚観",
    render: (record) => record.marriageView,
  },
  {
    key: "marriageTags",
    label: "結婚観タグ",
    render: (record) => joinList(record.marriageTags),
  },
  {
    key: "workView",
    label: "職業観",
    render: (record) => record.workView,
  },
  {
    key: "workTags",
    label: "職業観タグ",
    render: (record) => joinList(record.workTags),
  },
  {
    key: "dressCode",
    label: "服装規定",
    render: (record) => record.dressCode,
  },
  {
    key: "dressTags",
    label: "服装規定タグ",
    render: (record) => joinList(record.dressTags),
  },
  {
    key: "tags",
    label: "特徴タグ",
    render: (record) => joinList(record.tags),
  },
]

const selectOptions = [
  {
    key: "deityType",
    label: "神タイプ",
    values: filterOptions.deityType,
  },
  {
    key: "afterlife",
    label: "死後観",
    helpHref: "/articles/afterlife/",
    values: filterOptions.afterlife,
  },
  {
    key: "disciplineStrictness",
    label: "戒律の厳しさ",
    helpHref: "/articles/discipline/",
    values: filterOptions.disciplineStrictness,
  },
  {
    key: "practiceBurden",
    label: "実践負荷",
    helpHref: "/articles/practice-burden/",
    values: filterOptions.practiceBurden,
  },
  {
    key: "alcohol",
    label: "飲酒可否",
    values: filterOptions.alcohol,
  },
  {
    key: "communityImportance",
    label: "共同体重視度",
    values: filterOptions.communityImportance,
  },
  {
    key: "worshipFrequency",
    label: "礼拝頻度",
    values: filterOptions.worshipFrequency,
  },
  {
    key: "marriageTags",
    label: "結婚観タグ",
    values: filterOptions.marriageTags,
  },
  {
    key: "workTags",
    label: "職業観タグ",
    values: filterOptions.workTags,
  },
  {
    key: "dressTags",
    label: "服装規定タグ",
    values: filterOptions.dressTags,
  },
] as const

type FilterOptionKey = keyof FilterState

const FilterControls = ({
  filters,
  onToggle,
}: {
  filters: FilterState
  onToggle: (key: FilterOptionKey, value: string) => void
}) => (
  <div className={styles.filterGrid}>
    {selectOptions.map((option) => (
      <fieldset className={styles.filterFieldset} key={option.key}>
        <legend className={styles.filterLegend}>
          <span>{option.label}</span>
          {"helpHref" in option ? (
            <Link
              aria-label={`${option.label}の解説記事へ`}
              className={styles.filterHelpLink}
              href={option.helpHref}
            >
              ?
            </Link>
          ) : null}
        </legend>
        <div className={styles.filterOptionList}>
          {option.values.map((value) => {
            const selectedValues = filters[option.key] as string[]
            const checked = selectedValues.includes(value)

            return (
              <label className={styles.filterOption} key={value}>
                <input
                  checked={checked}
                  className={styles.filterCheckbox}
                  onChange={() => onToggle(option.key, value)}
                  type="checkbox"
                />
                <span className={styles.filterOptionText}>{value}</span>
              </label>
            )
          })}
        </div>
      </fieldset>
    ))}
  </div>
)

export const CatalogApp = ({ records }: CatalogAppProps) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        if (
          filters.deityType.length > 0 &&
          !filters.deityType.includes(record.deityType)
        ) {
          return false
        }

        if (
          filters.afterlife.length > 0 &&
          !filters.afterlife.some((value) => record.afterlife.includes(value))
        ) {
          return false
        }

        if (
          filters.disciplineStrictness.length > 0 &&
          !filters.disciplineStrictness.includes(record.disciplineStrictness)
        ) {
          return false
        }

        if (
          filters.practiceBurden.length > 0 &&
          !filters.practiceBurden.includes(record.practiceBurden)
        ) {
          return false
        }

        if (
          filters.alcohol.length > 0 &&
          !filters.alcohol.includes(record.alcohol)
        ) {
          return false
        }

        if (
          filters.communityImportance.length > 0 &&
          !filters.communityImportance.includes(record.communityImportance)
        ) {
          return false
        }

        if (
          filters.worshipFrequency.length > 0 &&
          !filters.worshipFrequency.includes(record.worshipFrequency)
        ) {
          return false
        }

        if (
          filters.marriageTags.length > 0 &&
          !filters.marriageTags.some((value) =>
            record.marriageTags.includes(value)
          )
        ) {
          return false
        }

        if (
          filters.workTags.length > 0 &&
          !filters.workTags.some((value) => record.workTags.includes(value))
        ) {
          return false
        }

        if (
          filters.dressTags.length > 0 &&
          !filters.dressTags.some((value) => record.dressTags.includes(value))
        ) {
          return false
        }

        return true
      }),
    [filters, records]
  )

  const onFilterToggle = (key: FilterOptionKey, value: string) => {
    setFilters((current) => {
      const values = current[key] as string[]

      return {
        ...current,
        [key]: values.includes(value)
          ? values.filter((item) => item !== value)
          : [...values, value],
      }
    })
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Find what to believe</p>
        <h1 className={styles.heroTitle}>
          気になる価値観から、信じるものを見つける
        </h1>
        <p className={styles.heroText}>
          いきなりむずかしい教義を読むのではなく、
          暮らし方や大事にしたい価値観から、気になる宗教や宗派を気軽に見比べられます。
          ここでは優劣ではなく、自分にとっての理解しやすさを大切にしています。
        </p>
        <div className={styles.heroHighlights}>
          <span className={styles.heroPill}>暮らしに近い視点でチェック</span>
          <span className={styles.heroPill}>気になる条件ですぐ比較</span>
          <span className={styles.heroPill}>こだわりで絞り込み</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>宗派一覧</h2>
            <p className={styles.sectionText}>
              {filteredRecords.length}
              件を表示中。気になる宗派から詳細を開き、同じ条件の違いをそのまま比べられます。
            </p>
          </div>
          <button
            aria-expanded={isFilterOpen}
            className={styles.buttonGhost}
            onClick={() => setIsFilterOpen((current) => !current)}
            type="button"
          >
            {isFilterOpen ? "フィルターを閉じる" : "フィルターを表示"}
          </button>
        </div>
        {isFilterOpen ? (
          <FilterControls filters={filters} onToggle={onFilterToggle} />
        ) : null}
        {filteredRecords.length > 0 ? (
          <div className={styles.cards}>
            {filteredRecords.map((record) => {
              return (
                <article className={styles.card} key={record.id}>
                  <div className={styles.cardTop}>
                    <div>
                      <p className={styles.eyebrow}>{record.religion}</p>
                      <h3 className={styles.cardTitle}>{record.sect}</h3>
                    </div>
                    <span className={styles.chip}>{record.deityType}</span>
                  </div>

                  <div className={styles.summary}>
                    <p>死後観: {joinList(record.afterlife)}</p>
                    <p>実践負荷: {record.practiceBurden}</p>
                    <p>飲酒: {record.alcohol}</p>
                    <p>主な地域: {joinList(record.distributionRegions)}</p>
                  </div>

                  <div className={styles.chipRow}>
                    {record.tags.slice(0, 4).map((tag) => (
                      <span className={styles.chip} key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.cardActions}>
                    <Link
                      className={styles.buttonGhost}
                      href={`/religions/${record.id}/`}
                    >
                      詳細
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className={styles.empty}>
            条件に一致する宗派がありません。フィルタ条件を緩めて再度確認してください。
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>比較</h2>
            <p className={styles.sectionText}>
              気になる条件で絞り込んだ宗派を、主要特徴ごとに横並びで比較できます。
            </p>
          </div>
          <div className={styles.sectionActions}>
            <button
              aria-expanded={isFilterOpen}
              className={styles.buttonGhost}
              onClick={() => setIsFilterOpen((current) => !current)}
              type="button"
            >
              {isFilterOpen ? "フィルターを閉じる" : "フィルターを表示"}
            </button>
            <button
              className={styles.buttonGhost}
              onClick={() => setFilters(defaultFilters)}
              type="button"
            >
              フィルタをリセット
            </button>
          </div>
        </div>
        {isFilterOpen ? (
          <FilterControls filters={filters} onToggle={onFilterToggle} />
        ) : null}
        {filteredRecords.length > 0 ? (
          <div className={styles.compareTable}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>比較項目</th>
                  {filteredRecords.map((record) => (
                    <th key={record.id} style={{ textAlign: "center" }}>
                      {record.religion} / {record.sect}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={`filtered-${row.key}`}>
                    <th scope="row">{row.label}</th>
                    {filteredRecords.map((record) => (
                      <td
                        key={`filtered-${row.key}-${record.id}`}
                        style={{ textAlign: "center" }}
                      >
                        {row.render(record)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.empty}>
            条件に一致する宗派がないため、比較表を表示できません。
          </div>
        )}
      </section>
    </div>
  )
}
