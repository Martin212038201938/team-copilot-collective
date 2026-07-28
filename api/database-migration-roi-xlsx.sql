-- Zweite Datei je Lieferung: die befüllte Excel geht zusammen mit der PowerPoint
-- an denselben Empfänger und wird über denselben Token ausgeliefert.
ALTER TABLE roi_deliveries
    ADD COLUMN file_path_xlsx VARCHAR(500) NULL AFTER file_path,
    ADD COLUMN file_size_xlsx_bytes INT NULL AFTER file_size_bytes;
