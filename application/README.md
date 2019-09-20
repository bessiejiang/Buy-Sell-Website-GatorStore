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

- [Ansible](https://www.ansible.com/)

  Used to install the server software like Node.js and MySQL

  - [Download here for macOS + linux](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-the-control-node)
  - [Instructions for Windows](https://www.how2shout.com/how-to/how-to-install-ansible-on-windows-10.html)

Once the tools are installed:

```
cd application

# download and create the virtual machine
# it will take a while the first time
vagrant up

# open a shell to the virtual machine
npm run dev
```

Now you should have a prompt that looks like:

```
vagrant@vagrant:/vagrant$
```

You should now install the Node.js dependencies:

```
npm install
```

After that, you should be ready to start the server!

**When you are done, you should suspend the VM to save laptop battery: `vagrant suspend`**

## 2. Run the local server

If you haven't already, start the VM and get a remote shell:

```
vagrant up
npm run dev
```

Now start the server and have it automatically restart when changes are made:

```
npm run watch
```

_Note: if the server doesn't auto restart, type `rs` and press Enter to restart it_

Open up [http://localhost:1648](http://localhost:1648) to see the local server.

Woohoo, now you can work on stuff 🎉!

**When you are done, you should suspend the VM to save laptop battery: `vagrant suspend`**

## 3. Auto format source code

In an effort to keep code style the same, there is an auto formatter that should be run before commits, or at least before Pull Requests.

It's called [Prettier](https://prettier.io/) and can format JavaScript, CSS, and HTML.

```
# print files that aren't formatted
npm run check

# try to auto format the files
npm run fix
```

# Deploying to production server

To deploy ansible (ie. software packages) changes:

```
ansible-playbook -i provision/webserver.ini provision/ansible.yml
```
