# Install

This guide assumes you are running a Debian-based Linux distribution like Ubuntu for package management - consult your operating system's documentation and open source project documentation as appropriate to complete installation.

You will need access to the production server to complete this guide.

1. [Fork the repository at GitHub](https://help.github.com/articles/fork-a-repo/)
2. `sudo apt-get update && sudo apt-get install apache2 mysql-server libapache2-mod-php mcrypt php-curl php-dev php-fpm php-gd php-imagick php-mcrypt php-mysql php-mbstring php-pear php-xml php-xmlrpc php-zip` - Install the LAMP stack and supporting software for Craft (**Note:** You may also want to install Ruby, npm, and a number of project dependencies to work with the frontend - these steps are beyond the scope of this document at this time)
3. `git clone https://github.com/{username}/FreeUKGenealogy` - Clone the repository
4. `sudo chown -R ${USER}:www-data FreeUKGenealogy && chmod -R g+w FreeUKGenealogy` - Change file group ownership and write permissions
5. `scp -r ${CRAFT_HOST}:${CRAFT_PATH}/config ./FreeUKGenealogy/craft/ && scp -r ${CRAFT_HOST}:${CRAFT_PATH}/storage ./FreeUKGenealogy/craft/` (where `$CRAFT_HOST` is the production web server and `$CRAFT_PATH` is the filesystem path) - Pull down configuration and database dumps
6. `mysql` + `CREATE DATABASE freeukgenealogy;` - Log in to your local MySQL instance and create a database for the Craft CMS installation
7. `mysql freeukgenealogy < "$( ls ./FreeUKGenealogy/craft/storage/backups/ | tail -n1 )"` - Import the most recent database backup
8. `sudo a2enmod rewrite && sudo a2enmod ssl && sudo cp ./FreeUKGenealogy/etc/localhost/local.freeukgenealogy.conf /etc/apache2/sites-available && a2ensite local.freeukgenealogy && sudo apache2ctl restart` - Enable Apache2 mods, copy the site configuration, enable the site, and restart `apache2`
9. `sudo echo -e "127.0.0.1\tfreeukgenealogy.local" > /etc/hosts` - Add an `/etc/hosts` directive for your local instance

If everything worked as expected, you should now be able to browse to `https://freeukgenealogy.local/` to work on the site and manage code changes using `git`.