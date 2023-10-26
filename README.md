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

Options:
  -V, --version               output the version number
  -h, --help                  display help for command

Commands:
  list                        List all the user config group
  set [options] <group-name>  Set one group for user config
    --name                    User name
    --email                   User email
  use [options] <group-name>  Use one group name for user config
    --global                  Git global config
  delete <group-name>         Delete one group
  current                     Show user config in current directory
  help [command]              display help for command
```

## Change Log

### v1.0.6

- feat: Add command `gum current` to show user config in current directory

### v1.0.5

- feat: Support `gum use <group-name> --global` commands that are not Git repositories

### v1.0.4

- fix: support user.name contain space

### v1.0.3

- fix: Group name can't be 'global'

### v1.0.2

- feat: `gum --version` cmd
- fix: support node v9.0.0
