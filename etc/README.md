# Environments

Use the appropriate configuration for your environment:

* **AWS** - Amazon Web Services instances
* **c9.io** - TEST instances
* **local** - Local development instances
* **cms.freebmd.org.uk** - Hetzner hosting production instance

## AWS

TODO

## c9.io

Run the following command to replace 001-cloud9.conf with repository version (enforces username `preview`/password `preview` with HTTP basic auth):

`rm /etc/apache2/sites-available/001-cloud9.conf && ln -s /home/ubuntu/workspace/etc/c9.io/001-cloud9.conf /etc/apache2/sites-available/001-cloud9.conf`

## Local

TODO

## cms.freebmd.org.uk

TODO
