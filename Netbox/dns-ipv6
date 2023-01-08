/* Ninja-IX Script to pull ipv6 dns info into netbox ip address table
update 23-01-8 PE
*/
SELECT 
    concat(`ixpmanager`.`vlaninterface`.`ipv6hostname`,".",`ixpmanager`.`vlan`.`name`,"IX.Ninja-IX.net"),
    `ixpmanager`.`vlaninterface`.`ipv6canping`,
    concat(`ipv6address`.`address`,"/64"),
    `ixpmanager`.`cust`.`name`,
    `ixpmanager`.`company_registration_detail`.`registeredName`,
    `ixpmanager`.`vlan`.`number`,
    `ixpmanager`.`ipv6address`.`updated_at`,
    `ixpmanager`.`cust`.`autsys`,
    `ixpmanager`.`vlan`.`private`,
    `ixpmanager`.`vlan`.`name`,
    `ixpmanager`.`vlaninterface`.`ipv6enabled`,
    `ixpmanager`.`vlaninterface`.`ipv6monitorrcbgp`,
    `ixpmanager`.`vlaninterface`.`busyhost`,
    concat("https://portal.ninja-ix.net/customer/overview/",`ixpmanager`.`cust`.`id`)
FROM     `ixpmanager`.`vlaninterface`
        JOIN     `ixpmanager`.`ipv6address` ON (`ipv6address`.`id` = `ipv6addressid`)
        JOIN     `ixpmanager`.`vlan` ON (`vlan`.`id` = `vlaninterface`.`vlanid`)
        JOIN     `ixpmanager`.`virtualinterface` ON (`virtualinterface`.`id` = `vlaninterface`.`virtualinterfaceid`)
        JOIN     `ixpmanager`.`cust` ON (`cust`.`id` = `virtualinterface`.`custid`)
        JOIN	 `ixpmanager`.`company_registration_detail` ON (`company_registration_detail`.`id` = `cust`.`company_registered_detail_id`)
WHERE     `ipv6address`.`address` IS NOT NULL 
    ORDER BY `ipv6address`.`address`;
/*  
EXPORT
INTO OUTFILE '/var/lib/mysql-files/ipv6-dns.csv'
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';
*/
