BEGIN;

SET @id = ?;
SET @owner_id = ?;
SET @full_name = ?;
SET @money_account = ?;
SET @realm = ?;
SET @salary = ?;

INSERT INTO workers (id, owner_id, full_name, money_account, realm, salary) 
            VALUES (@id, @owner_id, @full_name, @money_account, @realm, @salary);

COMMIT;