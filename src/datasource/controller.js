import {bankaccounts, items, shopusers, transactions} from './data';
import {v4 as uuidv4} from 'uuid';

function shopLogin(data) {
  if ((!data.login) || (!data.password)) return {error: 1, status: 404, data: 'aucun login/pass fourni'};
  let user = shopusers.find(e => e.login === data.login);
  if (!user) return {error: 1, status: 404, data: 'login/pass incorrect'};
  if (!user.uuid) user.uuid = uuidv4();
  return {error: 0, status: 200, data: user};
}

function getAllViruses() {
  return {error: 0, data: items};
}

function getAccountAmount(number) {
  if (!number) return {error: 1, status: 404, data: 'aucun numéro de compte bancaire fourni'};
  let account = bankaccounts.find(a => a.number === number);
  if (!account) return {error: 1, status: 404, data: 'numéro de compte bancaire incorrect'};
  return {error: 0, status: 200, data: account.amount};
}

function getAccountTransactions(number) {
  if (!number) return {error: 1, status: 404, data: 'aucun numéro de compte bancaire fourni'};
  let account = bankaccounts.find(a => a.number === number);
  if (!account) return {error: 1, status: 404, data: 'numéro de compte bancaire incorrect'};
  let trans = transactions.filter(t => t.account === account._id);
  return {error: 0, status: 200, data: trans};
}

function getAccount(number){
  if (!number) return {error: 1, status: 404, data: 'aucun numéro de compte bancaire fourni'};
  let account = bankaccounts.find(a => a.number === number);
  if (!account) return {error: 1, status: 404, data: 'numéro de compte bancaire incorrect'};
  return account;
}

function getTransactions(id_account){
  if (!id_account) return {error: 1, status: 404, data: 'aucun numéro de compte bancaire fourni'};
  let transAccount = transactions.find(a => a.account === id_account);
  let transDest = transactions.find(a => a.destination === id_account);
  if (!transAccount && !transDest) return {error: 1, status: 404, data: 'aucune transaction pour ce compte'};
}

function createWithdraw(id_account, amount) {
  if (!id_account) return { error: 1, status: 404, data: 'aucun numéro de compte bancaire fourni' };
  let account = bankaccounts.find(a => a._id === id_account);
  if (!account) return { error: 1, status: 404, data: 'numéro de compte bancaire incorrect' };
  let newTrans = {
    _id: generateId(),
    amount: -amount,
    account: id_account,
    date: { $date: new Date().toISOString() },
    uuid: uuidv4()
  };
  account.amount -= amount;
  let updatedAccountIndex = bankaccounts.findIndex(a => a._id === id_account);
  bankaccounts[updatedAccountIndex].amount = account.amount;
  transactions.push(newTrans);
  return { error: 0, status: 200, data: { uuid: newTrans.uuid, amount: account.amount } };
}

function generateId() {
  const byteArray = new Uint8Array(12);
  window.crypto.getRandomValues(byteArray);
  return Array.from(byteArray).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function createPayment(id_account, amount, destination) {
  if (!id_account) return { error: 1, status: 404, data: 'aucun numéro de compte bancaire fourni' };
  let account = bankaccounts.find(a => a._id === id_account);
  if (!account) return { error: 1, status: 404, data: 'numéro de compte bancaire incorrect' };
  let destAccount = bankaccounts.find(a => a._id === destination);
  if (!destAccount) return { error: 1, status: 404, data: 'compte destinataire inexistant' };
  let newTrans = {
    _id: generateId(),
    amount: amount,
    account: id_account,
    destination: destination,
    date: { $date: new Date().toISOString() },
    uuid: uuidv4()
  };
  account.amount -= amount;
  destAccount.amount += amount;
  let updatedAccountIndex = bankaccounts.findIndex(a => a._id === id_account);
  let updatedDestAccountIndex = bankaccounts.findIndex(a => a._id === destination);
  bankaccounts[updatedAccountIndex].amount = account.amount;
  bankaccounts[updatedDestAccountIndex].amount = destAccount.amount;
  transactions.push(newTrans);
  return { error: 0, status: 200, data: { uuid: newTrans.uuid, amount: account.amount } };
}

export default{
  shopLogin,
  getAllViruses,
  getAccountAmount,
  getAccountTransactions,
  getAccount,
  getTransactions,
  createWithdraw,
  createPayment
}