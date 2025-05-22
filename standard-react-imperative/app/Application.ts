import { routerBlueprint } from "@stone-js/router";
import { defineStoneReactApp } from "@stone-js/use-react";
import { browserAdapterBlueprint } from "@stone-js/browser-adapter";
import { nodeHttpAdapterBlueprint } from "@stone-js/node-http-adapter";
import { AdapterHookListenerContext, LogLevel, Logger, defineHookListener } from "@stone-js/core";

/**
 * Run before the application starts
 * 
 * @param blueprint - The blueprint
 */
export function onStart ({ blueprint }: AdapterHookListenerContext): void {
  Logger.log(`${blueprint.get('stone.name', 'Stone App')} is starting...`)
}

/**
 * Run just before the application stops
 * 
 * @param blueprint - The blueprint
 */
export function onStop ({ blueprint }: AdapterHookListenerContext): void {
  Logger.log(`${blueprint.get('stone.name', 'Stone App')} is stopping...`)
}

/**
 * Define Stone Application.
 */
export const MyStoneReactApp = defineStoneReactApp(
  { name: 'MyApp', logger: { level: LogLevel.INFO } },
  [
    routerBlueprint,
    browserAdapterBlueprint,
    nodeHttpAdapterBlueprint,
  ]
)

/**
 * Application hooks blueprint.
 */
export const onStartHook = defineHookListener(onStart, { name: 'onStart' })
export const onStopHook = defineHookListener(onStop, { name: 'onStop' })