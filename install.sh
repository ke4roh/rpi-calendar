#!/bin/bash

function makeFileWithMode {
	[[ -f $1 ]] || (touch $1 ; chmod $2 $1)
}

# assume sudo permission (it is default)

# check ssh is turned on
sudo systemctl status ssh | grep -q "Active: active" || sudo systemctl start ssh
sudo systemctl status ssh | grep Loaded: | grep -q "ssh.service; enabled" || sudo systemctl enable ssh

# check ssh keygen ran for pi
[[ -f /home/pi/.ssh/id_rsa ]] || (echo -e "\n\n\n" | ssh-keygen 2>&1 >/dev/null)

# check pi has its own authorized_key
ak="/home/pi/.ssh/authorized_keys"
makeFileWithMode $ak 600
grep -q "$(cat /home/pi/.ssh/id_rsa.pub)" $ak || (cat /home/pi/.ssh/id_rsa.pub >> $ak)

# check pi has the localhost known_host
kh="/home/pi/.ssh/known_hosts"
makeFileWithMode $kh 600
grep -q localhost $kh || ssh-keyscan localhost >>$kh

# install Ansible if necessary
sudo dpkg -s ansible 2>&1 >/dev/null || sudo apt-get install -y ansible

if [ !# -gt 0 ] ; then
    EXTRA_VARS="--extra_vars $*"
fi
ansible-playbook playbook.yml -i hosts-localhost -u pi $EXTRA_VARS
