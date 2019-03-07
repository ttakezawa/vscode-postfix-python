//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert'
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vsc from 'vscode'
// import { VarTemplate } from '../src/templates/varTemplates'
import { getCurrentSuggestion } from '../src/postfixCompletionProvider'
import { getCurrentDelay, delay } from './utils'

const LANGUAGE = 'postfix'

describe('Simple template tests', () => {
  it('return template', testTemplate('expr', 'return', 'return expr'))

  it('not template', testTemplate('expr', 'not', 'not expr '))
  it('is none template,', testTemplate('expr', 'none', 'expr is None'))
  it('is not none template,', testTemplate('expr', 'notnone', 'expr is not None'))

 
  it('if template', testTemplate('expr', 'if', 'ifexpr:', true))
  it('if is none template', testTemplate('expr', 'ifin', 'ifexprisNone:', true))
  it('if is not none template', testTemplate('expr', 'ifnn', 'ifexprisnotNone:', true))
  // it('if else template', testTemplate('expr', 'if else', 'ifexpr:else:', true))
  // it('if elif template', testTemplate('expr', 'if elif', 'ifexpr:elifsomecode:', true))

  it('for loop template', testTemplate('expr', 'forloop', 'foriinrange(expr):', true))
  it('for in template', testTemplate('expr', 'forin', 'foriteminexpr:', true))
  
  it('try except template', testTemplate('expr', 'tryexcept', 'try:exprexcepte:', true))
  it('try except finally template', testTemplate('expr', 'tryexceptfinally', 'try:exprexcepte:finally:', true))

  describe('custom template tests', () => {
    const config = vsc.workspace.getConfiguration('postfix')

    before(done => {
      config.update('customTemplates', [{
        'name': 'custom',
        'body': '!{{expr}}',
        'description': '!expr',
        'when': [
          'identifier', 'unary-expression', 'binary-expression', 'expression', 'function-call'
        ]
      }], true).then(() => done(), err => done(err))
    })

    after(done => {
      config.update('customTemplates', undefined, true).then(() => done(), err => done(err))
    })

    // it('identifier', testTemplate('expr', 'custom', '!expr'))
    // it('expression', testTemplate('expr.test', 'custom', '!expr.test'))
    // it('expression 2', testTemplate('expr[index]', 'custom', '!expr[index]'))
    // it('binary-expression', testTemplate('x > 100', 'custom', '!x > 100'))
    // it('unary-expression', testTemplate('!x', 'custom', '!!x'))
    // it('function-call', testTemplate('call()', 'custom', '!call()'))
    // it('function-call 2', testTemplate('test.call()', 'custom', '!test.call()'))
  })

  describe('custom template with multiple expr tests', () => {
    const config = vsc.workspace.getConfiguration('postfix')

    before(done => {
      config.update('customTemplates', [{
        'name': 'double',
        'body': '{{expr}} + {{expr}}',
        'description': 'double expr',
        'when': [
          'identifier', 'unary-expression', 'binary-expression', 'expression', 'function-call'
        ]
      }], true).then(() => done(), err => done(err))
    })

    after(done => {
      config.update('customTemplates', undefined, true).then(() => done(), err => done(err))
    })

    // it('identifier', testTemplate('expr', 'double', 'expr + expr'))
    // it('expression', testTemplate('expr.test', 'double', 'expr.test + expr.test'))
    // it('expression 2', testTemplate('expr[index]', 'double', 'expr[index] + expr[index]'))
    // it('binary-expression', testTemplate('x > 100', 'double', 'x > 100 + x > 100'))
    // it('unary-expression', testTemplate('!x', 'double', '!x + !x'))
    // it('function-call', testTemplate('call()', 'double', 'call() + call()'))
    // it('function-call 2', testTemplate('test.call()', 'double', 'test.call() + test.call()'))
  })
})

function testTemplate (initialText: string, template: string, expectedResult: string, trimWhitespaces?: boolean, preAssertAction?: () => Thenable<void>) {
  return (done: MochaDone) => {
    vsc.workspace.openTextDocument({ language: LANGUAGE }).then((doc) => {
      return selectAndAcceptSuggestion(
        doc, initialText, template
      ).then(async () => {
        if (preAssertAction) {
          await preAssertAction()
        }

        assertText(doc, expectedResult, trimWhitespaces)
        await vsc.commands.executeCommand('workbench.action.closeActiveEditor')
        done()
      }).then(undefined, async (reason) => {
        await vsc.commands.executeCommand('workbench.action.closeActiveEditor')
        done(reason)
      })
    })
  }
}

function testTemplateWithQuickPick (initialText: string, template: string, expectedResult: string, trimWhitespaces?: boolean, skipSuggestions: number = 0, cancelQuickPick: boolean = false) {
  return testTemplate(initialText, template, expectedResult, trimWhitespaces, async () => {
    if (cancelQuickPick) {
      await vsc.commands.executeCommand('workbench.action.closeQuickOpen')
    } else {
      for (let i = 0; i < skipSuggestions; i++) {
        await vsc.commands.executeCommand('workbench.action.quickOpenSelectNext')
      }

      await vsc.commands.executeCommand('workbench.action.focusQuickOpen')
      await vsc.commands.executeCommand('workbench.action.acceptSelectedQuickOpenItem')
    }

    await delay(10)
  })
}

function selectAndAcceptSuggestion (doc: vsc.TextDocument, initialText: string, template: string) {
  return vsc.window.showTextDocument(doc, vsc.ViewColumn.One).then((editor) => {
    let cursorIdx = initialText.indexOf('{cursor}')
    if (cursorIdx > -1) {
      initialText = initialText.replace('{cursor}', `.${template}`)
    } else {
      initialText += `.${template}`
      cursorIdx = initialText.length
    }

    return editor.edit(edit => {
      edit.insert(new vsc.Position(0, 0), initialText)
    }).then(async () => {
      let pos = new vsc.Position(0, cursorIdx + template.length + 1)
      editor.selection = new vsc.Selection(pos, pos)

      await vsc.commands.executeCommand('editor.action.triggerSuggest')
      await delay(getCurrentDelay())

      let current = getCurrentSuggestion()
      const first = current

      while (current !== template) {
        await vsc.commands.executeCommand('selectNextSuggestion')
        current = getCurrentSuggestion()

        if (current === first) {
          break
        }
      }

      return vsc.commands.executeCommand('acceptSelectedSuggestion')
    })
  })
}

function assertText (doc: vsc.TextDocument, expectedResult: string, trimWhitespaces: boolean) {
  let result = doc.getText()

  if (trimWhitespaces) {
    result = result.replace(/\s/g, '')
  }

  assert.equal(result, expectedResult)
}
