SELECT `ipv4hostname`,`ipv4canping`,`address`,`name` FROM `ixpmanager`.`vlaninterface` 
JOIN `ixpmanager`.`ipv4address` 
ON (`ipv4address`.`id`= `ipv4addressid`) 
JOIN `ixpmanager`.`vlan` 
ON  `vlan`.`id`=`vlaninterface`.`vlanid` 
WHERE `ipv4canping` is true and `address`is Not null
INTO OUTFILE '/var/lib/mysql-files/ipv4-dns.csv'
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';
