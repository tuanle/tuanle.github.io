---
layout: default
title:  "Install php-xml on centos 6.7 and php 7.1"
date: 2017-03-08
tags: [installation, centos, php, ext-dom, phpunit, github-pages]
---

* TOC
{:toc}

## 1, How to check system version and php version

Check system version

```shell
cat /etc/*release
```

Check php version

```shell
php --version
```

Check php loaded configurations

```shell
php -i | grep ini
```

Check php loaded modules

```shell
php -m
```

Check where php modules is installed

```shell
php -i | grep extension_dir
```

## 2, How to install php-xml

The problem is when run `composer update`, I receive error log:

```
Problem 1
    - Installation request for phpunit/phpunit 5.7.3 -> satisfiable by phpunit/phpunit[5.7.3].
    - phpunit/phpunit 5.7.3 requires ext-dom * -> the requested PHP extension dom is missing from your system.
```

Try reseach on google, the solution is installing `php-xml`. But when I run `sudo yum install php-xml`, it said:

```
--> Processing Dependency: php-common(x86-64) = 5.3.3-48.el6_8 for package: php-xml-5.3.3-48.el6_8.x86_64
```

But system is running `php71`. So I tried to run `sudo yum install php71-php-xml` but nothing happen.

I worked for 1 hour and found the problem: Package php71-php-xml build `dom.so` and `xml.so` but it locate in another folder not php loaded modules folder.

So my solution is:

```shell
sudo cp /opt/remi/php71/root/usr/lib64/php/modules/dom.so /usr/lib64/php/modules/
sudo cp /opt/remi/php71/root/usr/lib64/php/modules/xml.so /usr/lib64/php/modules/
sudo cp /etc/php.d/20-gd.ini /etc/php.d/20-dom.ini # and edit to extension=dom.so
sudo cp /etc/php.d/20-gd.ini /etc/php.d/20-xml.ini # and edit to extension=xml.so
sudo service httpd restart
```

And it worked.
