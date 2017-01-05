# Installation

## 1, Cài đặt qua composer

```
composer create-project --prefer-dist laravel/laravel <new-project-name>
cd <new-project-name>
```

## 2, Set permission

(www-data là webserver user, tuanlq là login user)

**Webserver as owner (cách bình thường)**

```
sudo chown -R www-data:www-data /path/to/your/root/directory
sudo usermod -a -G www-data tuanlq
sudo find /path/to/your/root/directory -type f -exec chmod 644 {} \;
sudo find /path/to/your/root/directory -type d -exec chmod 755 {} \;
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```

**Your user as owner**

```
sudo chown -R tuanlq:www-data /path/to/your/root/directory
sudo find /path/to/your/root/directory -type f -exec chmod 664 {} \;
sudo find /path/to/your/root/directory -type d -exec chmod 775 {} \;
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```

_(http://stackoverflow.com/a/37266353)_

## 3, Tạo file `.env` và application key

```
cp .env.example .env
php artisan key:generate
```
