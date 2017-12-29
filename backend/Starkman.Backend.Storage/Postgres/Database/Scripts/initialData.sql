INSERT INTO Seo (Seo_ID, Url, Title, Sortorder) VALUES (1, 'recommend', 'пейнлемдсел', 1);
INSERT INTO Seo (Seo_ID, Url, Title, Sortorder) VALUES (2, 'new', 'мнбхмйх', 2);
INSERT INTO Seo (Seo_ID, Url, Title, Sortorder) VALUES (3, 'hit', 'ухрш', 3);

INSERT INTO Promotion (promotion_id, Seo_ID) VALUES (1, 1);
INSERT INTO Promotion (Promotion_ID, Seo_ID) VALUES (2, 2);
INSERT INTO Promotion (Promotion_ID, Seo_ID) VALUES (3, 3);

/*
SELECT * FROM Seo;
SELECT * FROM Promotion;

DELETE FROM Promotion;
DELETE FROM Seo;
*/