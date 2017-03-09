---
layout: post
title:  "Create new Laravel project"
date: 2017-01-08
category: work
tags: [laravel, installation]
---

* TOC
{:toc}

## Via composer

```shell
$ composer create-project --prefer-dist laravel/laravel <new-project-name>
$ cd <new-project-name>
```

## Set permission

_www-data is webserver user, tuanlq is logined user_

### Webserver user as owner (recommend for production server)

```shell
$ sudo chown -R www-data:www-data /path/to/your/root/directory
$ sudo usermod -a -G www-data tuanlq
$ sudo find /path/to/your/root/directory -type f -exec chmod 644 {} \;
$ sudo find /path/to/your/root/directory -type d -exec chmod 755 {} \;
$ sudo chgrp -R www-data storage bootstrap/cache
$ sudo chmod -R ug+rwx storage bootstrap/cache
```

### Logined user as owner (recommend for local server)

```shell
sudo chown -R tuanlq:www-data /path/to/your/root/directory
sudo find /path/to/your/root/directory -type f -exec chmod 664 {} \;
sudo find /path/to/your/root/directory -type d -exec chmod 775 {} \;
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```

_Reference: [http://stackoverflow.com/a/37266353](http://stackoverflow.com/a/37266353)_

## Make file .env and generate application key

```
cp .env.example .env
php artisan key:generate
```
