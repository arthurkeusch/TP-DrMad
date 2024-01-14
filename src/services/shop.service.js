import LocalSource from "@/datasource/controller";

async function shopLoginFromLocalSource(data) {
  return LocalSource.shopLogin(data)
}

async function getAllVirusesFromLocalSource() {
  return LocalSource.getAllViruses()
}




async function shopLogin(data) {
  return await shopLoginFromLocalSource(data);
}

async function getAllViruses() {
  return await getAllVirusesFromLocalSource()
}




export default {
  shopLogin,
  getAllViruses,
}