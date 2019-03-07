# Postfix templates for Python
- simply folked from [ipatalas/vscode-postfix-ts](https://github.com/ipatalas/vscode-postfix-ts), and modify some code to adapt Python grammar
- testcase only cover some base usage, let me know if you find bugs

## Features

All available templates (`expr` means the expression on which the template is applied):

| Template          | Outcome |
| -------:          | ------- |
| **.if**           | `if expr:` |
| **.ifin**         | `if expr is None:` |
| **.ifnn**         | `if expr is not None:` |
| **.if else**      | `if expr : ... else:` |
| **.if elif**      | `if expr : ... elif ... : ...` |
| **.forloop**      | `for i in range(expr):` |
| **.forin**        | `for item in expr:` |
| **.not**          | `not expr` |
| **.none**         | `expr is None` |
| **.notnone**      | `expr is not None` |
| **.return**       | `return expr` |
| **.tryexcept**    | `try: expr except e: ...` |
| **.tryexceptfinally** | `try: expr except e: ... finally: ...` |

 



