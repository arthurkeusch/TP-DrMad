import LocalSource from "@/datasource/controller";

async function getAccountAmountFromLocalSource(number) {
  return LocalSource.getAccountAmount(number);
}

async function getAccountTransactionsFromLocalSource(number) {
  return LocalSource.getAccountTransactions(number);
}

async function getAccountFromLocalSource(number) {
  return LocalSource.getAccount(number);
}

async function getTransactionsFromLocalSource(number) {
  return LocalSource.getTransactions(number);
}

async function createWithdrawFromLocalSource(id_account, amount) {
  return LocalSource.createWithdraw(id_account, amount);
}

async function createPaymentFromLocalSource(id_account, amount, destination) {
  return LocalSource.createPayment(id_account, amount, destination);
}

async function getAllTransactionsFromLocalSource() {
  return LocalSource.getAllTransactions();
}




async function getAccountAmount(number) {
  let response;
  try {
    response = await getAccountAmountFromLocalSource(number);
  } catch (err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'};
  }
  return response;
}

async function getAccountTransactions(number) {
  let response;
  try {
    response = await getAccountTransactionsFromLocalSource(number);
  } catch (err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'};
  }
  return response;
}

async function getAccount(number) {
  let response;
  try {
    response = {error: 0, status: 200, data: await getAccountFromLocalSource(number)};
  } catch (err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'};
  }
  return response;
}

async function getTransactions(number) {
  let response;
  try {
    response = {error: 0, status: 200, data: await getTransactionsFromLocalSource(number)};
  } catch (err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'};
  }
  return response;
}

async function createWithdraw(id_account, amount) {
  let response;
  try {
    response = {error: 0, status: 200, data: await createWithdrawFromLocalSource(id_account, amount)};
  } catch (err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'};
  }
  return response;
}

async function createPayment(id_account, amount, destination) {
  let response;
  try {
    response = {error: 0, status: 200, data: await createPaymentFromLocalSource(id_account, amount, destination)};
  } catch (err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'};
  }
  return response;
}

async function getAllTransactions() {
  let response;
  try {
    response = {error: 0, status: 200, data: await getAllTransactionsFromLocalSource()};
  } catch (err) {
    response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'};
  }
  return response;
}

export default {
  getAccountAmount,
  getAccountTransactions,
  getAccount,
  getTransactions,
  createWithdraw,
  createPayment,
  getAllTransactions
}