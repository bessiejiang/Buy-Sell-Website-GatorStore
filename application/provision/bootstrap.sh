# bootstrap a new host to get ready to be provisioned by ansible

apt-get -qq update && \
apt-get -qq full-upgrade && \
apt-get -qq install \
aptitude \
ansible
