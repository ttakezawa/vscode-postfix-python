# Postfix templates for Python

simply folk from [ipatalas/vscode-postfix-ts](https://github.com/ipatalas/vscode-postfix-ts), and change some code in order to work with Python

## Features

![demo.gif](images/demo.gif)

All available templates (`expr` means the expression on which the template is applied):

| Template          | Outcome |
| -------:          | ------- |
| **.return**       | `return expr` |
| **.len**          | `len(expr)` |
| **.int**          | `int(expr)` |
| **.iter**         | `iter(expr)` |
| **.type**         | `type(expr)` |
| **.print**        | `print(expr)` |
| **.if**           | `if expr:` |
| **.ifn**          | `if expr is None:` |
| **.ifnn**         | `if expr is not None:` |
| **.forloop**      | `for i in range(expr):` |
| **.forin**        | `for item in expr:` |
