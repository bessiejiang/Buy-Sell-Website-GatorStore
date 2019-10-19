# Application Folder

## Purpose

The purpose of this folder is to store all the source code and related files for your team's application. Source code MUST NOT be in any of folder. <strong>YOU HAVE BEEN WARNED</strong>

You are free to organize the contents of the folder as you see fit. But remember your team is graded on how you use Git. This does include the structure of your application. Points will be deducted from poorly structured application folders.

## Please use the rest of the README.md to store important information for your team's application.

# Development workflow

## 1. Install the tools

Tools being used for development

- [Vagrant](https://www.vagrantup.com)

  Used to create a local virtual machine that is as close to the production server as possible

  - [Download here](https://www.vagrantup.com/downloads.html)

- [VirtualBox](https://www.virtualbox.org)

  Used by Vagrant to create a virtual machine for local development

  - [Download here](https://www.virtualbox.org/wiki/Downloads)

- [Ansible](https://www.ansible.com)

  **For local development this will automatically be installed.**<br/>
  **You only need to manually download if you are deploying to production.**

  Used to install the server software like Node.js and MySQL

  - [Download here for macOS + linux](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-the-control-node)
  - [Instructions for Windows](https://www.how2shout.com/how-to/how-to-install-ansible-on-windows-10.html)

Once the tools are installed:

```sh
cd csc648-fall2019-Team12/application

# 1. sets up the virtual machine
# 2. it will take a while the first time
# 3. opens a shell to the virtual machine
./scripts/dev
```

Now you should have a prompt that looks like:

```
vagrant@vagrant:/vagrant$
```

You should now install the Node.js dependencies:

```sh
npm install
```

After that, you should be ready to start the server!

**When you are done, press ctrl-d to exit the vagrant shell**

## 2. Run the local server

If you haven't already, start the VM and get a vagrant shell:

```sh
./scripts/dev
```

Now start the server and have it automatically restart when changes are made:

```sh
npm run dev
```

_Tip: if the server doesn't auto restart, type `rs` and press Enter to restart it_

Open up [http://localhost:1648](http://localhost:1648) to see the local server.

Woohoo, now you can work on stuff 🎉!

**When you are done, press ctrl-d to exit the vagrant shell**

## 3. Develop and push code

If you haven't already, start the VM and get a vagrant shell:

```sh
./scripts/dev
```

### Database

To setup the database for the first time, run these:

```sh
./scripts/db reset
```

_Note: you will need to run that again if the models or seed data changes_

To export data into the file `db-export.json`, run this:

```sh
# export all data
./scripts/db export

# export only data for model-name, ie. `user`, `item`, etc.
./scripts/db export model-name
```

This is useful for getting data to put into the seed files.

### Code formatting

In an effort to keep code style the same, there is an auto formatter that should be run before commits, or at least before Pull Requests.

It's called [Prettier](https://prettier.io/) and can format JavaScript, CSS, and HTML.

```sh
# print files that aren't formatted
npm run check

# try to auto format the files
npm run fix
```

## Troubleshooting

If you see `command not found: sequelize` then run:

```sh
./scripts/dev
```

And try again.

# Deploying to production server

_Note: `./scripts/prod` should **NOT** be run in the vagrant shell (`vagrant@vagrant:/vagrant$`)_

To deploy the code on the master branch and restart the production server:

```sh
# create git remote "prod" and push master branch
./scripts/prod code
```

To deploy ansible (ie. software and configuration):

```sh
./scripts/prod ansible

# if errors happen, run this and try again
./scripts/prod update
```

To ssh into production and get a remote shell:

```sh
./scripts/prod ssh
```

_When first initializing the production server, run in this order:_

```sh
# setup the server to be ready for ansible
./scripts/prod update

./scripts/prod ansible
./scripts/prod code
```

## Troubleshooting

If you see this:

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```

Then run this:

```sh
chmod 400 ../credentials/ssh/id_csc648
```

And try again.
