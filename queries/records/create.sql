BEGIN;

SET @id = ?;
SET @projects_id = ?;
SET @owner_id = ?;
SET @date = ?;
SET @money_account = ?;
SET @comment = ?;
SET @source_from = ?;

SET @income_id = ?;
SET @income_price = ?;

SET @costs_id = ?;
SET @costs_workers_id = ?;
SET @costs_price = ?;
SET @costs_already_paid = ?;

INSERT INTO records (id, 
                    projects_id, 
                    owner_id, 
                    date, 
                    money_account, 
                    comment, 
                    source_from) 
            VALUES (@id, 
                    @projects_id, 
                    @owner_id, 
                    @date, 
                    @money_account, 
                    @comment, 
                    @source_from);

INSERT INTO income (id, records_id, price)
            VALUES (@income_id, @id, @income_price);

INSERT INTO costs (id, records_id, workers_id, price, already_paid)
            VALUES (@costs_id, @id, @costs_workers_id, @costs_price, @costs_already_paid);

COMMIT;