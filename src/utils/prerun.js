/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com

This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.

This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import config from '../../config/config';
import {getDefaultAddress} from './web3_tools';

export async function onboardAsAtlas(web3, rolesRepository, logger) {
  logger.info(`Onboarding node as ATLAS with stake of 10000 AMB`);
  const address = getDefaultAddress(web3);
  const url = `localhost:${config.serverPort}`;
  await rolesRepository.onboardAsAtlas(address, url);
}

export async function onboardAsHermes(web3, rolesRepository, logger) {
  logger.info(`Onboarding node as HERMES`);
  const address = getDefaultAddress(web3);
  const url = `localhost:${config.serverPort}`;
  await rolesRepository.onboardAsHermes(address, url);
}

export async function registerAdminAccount(dataModelEngine, logger) {
  try {
    logger.info('Registering admin account');
    const account = await dataModelEngine.addAdminAccount();
    logger.info(`Address: ${account.address}`);
    if (account.secret) {
      logger.info(`Secret:  ${account.secret}`);
    }
  } catch (exception) {
    logger.error(exception.message);
  }
}

export async function addToKycWhitelist(role, dataModelEngine, logger) {
  logger.info(`Whitelist node address with registry`);
  const address = dataModelEngine.identityManager.nodeAddress();
  const kycContract = await dataModelEngine.contractManager.kycWhitelistContract();
  await kycContract
    .methods
    .add(address, role.roleIndex)
    .send({
      from: address,
      gas: 2000000
    });
}
