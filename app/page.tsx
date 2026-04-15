import { CatalogApp } from "components/catalog/catalog-app"
import { religionRecords } from "lib/religion"

const Page = () => {
  return <CatalogApp records={religionRecords} />
}

export default Page
