BEGIN;

SET @start_date = ?;
SET @end_date = ?;

SELECT records.id AS id,
       date,
       records.money_account AS money_account,
       comment,
       source_from,
       
       income.price AS income,

       costs.price AS costs,
       costs.already_paid AS already_paid,

       workers.full_name AS worker_full_name,
       workers.money_account AS worker_money_account,
       workers.realm AS worker_realm,
       workers.salary AS worker_salary
    FROM records 
        INNER JOIN income ON
            records.id = income.records_id
        INNER JOIN costs ON
            records.id = costs.records_id
        LEFT JOIN workers ON
            costs.workers_id = workers.id
        WHERE records.owner_id = ?
        AND records.date >= DATE(@start_date) 
        AND records.date <= DATE(@end_date) 
        AND records.projects_id = ?;

COMMIT;