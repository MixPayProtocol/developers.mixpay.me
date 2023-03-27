#!/bin/sh

cd /data/mixpay/developers.mixpay.me

changed=0
git remote update && git status -uno | grep -q 'Your branch is behind' && changed=1
if [ $changed = 1 ]; then
    git checkout .
    git pull
    yarn build && sudo rm -rf /var/www/developers.mixpay.me/developers/* && sudo mv -v build/* /var/www/developers.mixpay.me/developers && sudo cp /var/www/developers.mixpay.me/developers/guides/introduction.html /var/www/developers.mixpay.me/developers/index.html
    sudo chown www-data:www-data -R /var/www/developers.mixpay.me/
    echo "Updated successfully";
else
    echo "Up-to-date"
fi
