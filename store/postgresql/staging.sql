-- This file contain seeds that are going to be applied to staging. This can be used to
-- pre-populate some data for tests or something alike

INSERT INTO forms(uuid, archived, items )
VALUES ( '8e691352-e0a4-4bf5-ad9b-3f8f4cbb5340', false, '[{"uuid":"67f18feb-f54b-40b2-b772-b210e82d0ca2","archived":false,"objectKind":"form","items":[{"objectKind":"section","items":[{"fieldKind":"string","objectKind":"field","name":"Name","required":true},{"fieldKind":"integer","objectKind":"field","name":"Age","required":true},{"fieldKind":"string","objectKind":"field","name":"Gender","required":false},{"objectKind":"section","items":[{"fieldKind":"boolean","objectKind":"field","name":"Number of children"}]}]}]}]');

INSERT INTO forms(uuid, archived, items )
VALUES ( 'a3298f23-8fb6-46c8-8038-6cbe66912b88', true, '[]');

INSERT INTO forms(uuid, archived, items )
VALUES ( '7a79e812-c8f0-4e79-8c23-9d851d47f7b6', false, '[]');

INSERT INTO forms(uuid, archived, items )
VALUES ( 'aef9f957-f96c-4c8a-8fa1-013998c3527a', false, '[]');
