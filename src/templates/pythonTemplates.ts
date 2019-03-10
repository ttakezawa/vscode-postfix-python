import * as ts from 'typescript'
import * as vsc from 'vscode'
import { CompletionItemBuilder } from '../completionItemBuilder'
import { BaseExpressionTemplate } from './baseTemplates'
import { getIndentCharacters } from '../utils'

export class funcTemplates extends BaseExpressionTemplate {
  constructor (private funcname: string){
    super()
  }
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create(`${this.funcname}`, code)
      .description(`${this.funcname}(expr)`)
      .replace(`${this.funcname}(\${1:{{expr}}})\${0}`, position, true)
      .build()
  }
}

export class ifTemplates extends BaseExpressionTemplate {
  constructor (private shortcut: string, private descString: string, private replaceString: string) {
    super()
  }
  buildCompletionItem (code: string, position: vsc.Position){
    return CompletionItemBuilder
      .create(`${this.shortcut}`, code)
      .description(`${this.descString}`)
      .replace(`${this.replaceString}\n${getIndentCharacters()}`, position, true)
      .build()
  }
}

export class forloopTemplate extends BaseExpressionTemplate{
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create(`forloop`, code)
      .description(`for i in range(N):`)
      .replace(`for \${1:i} in range(\${2:{{expr}}}):\n${getIndentCharacters()}`, position, true)
      .build()
  }
}

export class forinTemplate extends BaseExpressionTemplate{
  buildCompletionItem (code: string, position: vsc.Position) {
    return CompletionItemBuilder
      .create(`forin`, code)
      .description(`for item in expr:`)
      .replace(`for \${1:item} in \${2:{{expr}}}:\n${getIndentCharacters()}`, position, true)
      .build()
  }
}

export const build = () => [
  new funcTemplates('iter'),
  new funcTemplates('type'),
  new funcTemplates('int'),
  new funcTemplates('len'),
  new funcTemplates('print'),

  new ifTemplates('if', 'if expr:', 'if \${1:{{expr}}}:'),
  new ifTemplates('ifn', 'if expr is None:', 'if \${1:{{expr}}} is None:'),
  new ifTemplates('ifnn', 'if expr is not None:', 'if \${1:{{expr}}} is not None:'),

  new forloopTemplate(),
  new forinTemplate()
]