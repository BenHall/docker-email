Docker Email
============

Example
-------

```
docker run --rm -ti -p 3000:3000 -e NODE_ENV=production -e USERNAME=sendgrid@email -e PASSWORD=pwd -e FROM=Foo@Bar.com -e TO=Foo@Bar.com -e SUBJECT=Test benhall/email 
```