# bootstrap a new host to get ready to be provisioned by ansible

apt-get -qy update && \
apt-get -qy full-upgrade && \
apt-get -qy autoremove && \
apt-get -qy install \
aptitude \
ansible
