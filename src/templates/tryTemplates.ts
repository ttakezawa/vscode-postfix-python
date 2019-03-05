import * as ts from 'typescript'
import * as vsc from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { BaseExpressionTemplate } from './baseTemplates'
import { getIndentCharacters } from '../utils'

export class TryExceptTemplate extends BaseExpressionTemplate{
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create(`tryexcept`, code)
      .description(`try: expr except e: ...`)
      .replace(`try:\n${getIndentCharacters()}\${1:{{expr}}} \nexcept \${2:e}:\n${getIndentCharacters()}\${3}\n`, position, true)
      .build()
  }
}

export class TryExceptFinallyTemplate extends BaseExpressionTemplate{
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create(`tryexceptfinally`, code)
      .description(`try: expr except e: ... finally: ...`)
      .replace(`try:\n${getIndentCharacters()}\${1:{{expr}}} \nexcept \${2:e}:\n${getIndentCharacters()}\${3} \nfinally:\n${getIndentCharacters()}\${4}\n`, position, true)
      .build()
  }
}

export const build = () => [
  new TryExceptTemplate(),
  new TryExceptFinallyTemplate(),
]