/* Ninja-IX Script to pull IPv4 dns info into netbox ip address table
update 23-01-08 PE
*/
SELECT 
    concat(`ixpmanager`.`vlaninterface`.`ipv4hostname`,".",`ixpmanager`.`vlan`.`name`,"IX.Ninja-IX.net"),
    `ixpmanager`.`vlaninterface`.`ipv4canping`,
    concat(`ipv4address`.`address`,"/24"),
    `ixpmanager`.`cust`.`name`,
    `ixpmanager`.`company_registration_detail`.`registeredName`,
    `ixpmanager`.`vlan`.`number`,
    `ixpmanager`.`ipv4address`.`updated_at`,
    `ixpmanager`.`cust`.`autsys`,
    `ixpmanager`.`vlan`.`private`,
    `ixpmanager`.`vlan`.`name`,
    `ixpmanager`.`vlaninterface`.`ipv4enabled`,
    `ixpmanager`.`vlaninterface`.`ipv4monitorrcbgp`,
    `ixpmanager`.`vlaninterface`.`busyhost`,
    concat("https://portal.ninja-ix.net/customer/overview/",`ixpmanager`.`cust`.`id`)
FROM     `ixpmanager`.`vlaninterface`
        JOIN     `ixpmanager`.`ipv4address` ON (`ipv4address`.`id` = `ipv4addressid`)
        JOIN     `ixpmanager`.`vlan` ON (`vlan`.`id` = `vlaninterface`.`vlanid`)
        JOIN     `ixpmanager`.`virtualinterface` ON (`virtualinterface`.`id` = `vlaninterface`.`virtualinterfaceid`)
        JOIN     `ixpmanager`.`cust` ON (`cust`.`id` = `virtualinterface`.`custid`)
        JOIN	 `ixpmanager`.`company_registration_detail` ON (`company_registration_detail`.`id` = `cust`.`company_registered_detail_id`)
WHERE     `ipv4address`.`address` IS NOT NULL 
    ORDER BY `ipv4address`.`address`;
/*  
EXPORT
INTO OUTFILE '/var/lib/mysql-files/ipv4-dns.csv'
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';
*/
