import * as alt from 'alt-server';
import { PluginSystem } from '../../../server/systems/plugins';

import './src/sit';


export const OActions = {
    name: 'OMEGA-Actions',
    version: 'v0.1',

};


PluginSystem.registerPlugin(OActions.name, async () => {
    alt.log(`~lg~${OActions.name} ${OActions.version} successfully loaded.`);
});
