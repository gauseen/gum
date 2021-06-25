# Git multiple user config manager

## Install

```sh
$ npm i -g @gauseen/gum
```

## Example

```sh
$ gum list

Currently used name=gauseen email=gauseen@gmail.com
┌────────────┬─────────┬─────────────────────────┐
│ group-name │    name │                   email │
├────────────┼─────────┼─────────────────────────┤
│    global  │ gauseen │ gauseen@gmail.com       │
│    user1   │ li si   │ lisi@gmail.com          │
│    user2   │ wang er │ wanger@gmail.com        │
└────────────┴─────────┴─────────────────────────┘
```

```sh
$ gum use user1

Currently used name=li si email=lisi@gmail.com
```

## Usage

```sh
Usage: gum [options] [command]

Commands:
  list                        List all the user config group
  set [options] <group-name>  Set one group for user config
    --name                    User name
    --email                   User email
  use [options] <group-name>  Use one group name for user config
    --global                  Git global config
  delete <group-name>         Delete one group
  help [command]              display help for command
```
