# Installation

{% if page.title %}
<a href="{{ root_url }}{{ page.url }}">{{ page.title }}</a>
{% endif %}

## 1, Cài đặt qua composer

```bash
composer create-project --prefer-dist laravel/laravel <new-project-name>
cd <new-project-name>
```

## 2, Set permission

(www-data là webserver user, tuanlq là login user)

**Webserver as owner (cách bình thường)**

```bash
sudo chown -R www-data:www-data /path/to/your/root/directory
sudo usermod -a -G www-data tuanlq
sudo find /path/to/your/root/directory -type f -exec chmod 644 {} \;
sudo find /path/to/your/root/directory -type d -exec chmod 755 {} \;
sudo chgrp -R www-data storage bootstrap/cache
sudo chmod -R ug+rwx storage bootstrap/cache
```

**Your user as owner**

```php
<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\AuthServiceInterface;

class VerifyAmsAuthKey
{
    /**
     * @var \App\Services\AuthServiceInterface
     */
    protected $authService;

    /**
     * Constructor
     */
    public function __construct(
        AuthServiceInterface $authService
    )
    {
        $this->authService = $authService;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (! $authKey = auth_key()) {
            return redirect(route('FCAU030')); // Login
        }

        if (
            ! ($amsUser = $this->authService->getAmsUserInfo($authKey))
            ||
            ! ($user = $this->authService->findByAmsUserId($amsUser['profile']['accountId']))
        ) {
            session()->flash('auth_key_timeout', true);

            return redirect(route('FCBA170')); // Logout
        }

        // Attach cookie to next response
        cookie()->queue(cookie()->forever('ams_auth_key', $authKey));

        // Create ams_user instance
        app()->instance('ams_user', array_merge($user->toArray(), $amsUser));

        return $next($request);
    }
}
```


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
