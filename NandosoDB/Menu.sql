CREATE TABLE [dbo].[Menu]
(
	[MenuId] INT NOT NULL PRIMARY KEY, 
    [Name] NCHAR(40) NULL, 
    [Description] NCHAR(300) NOT NULL, 
    [Price] DECIMAL(3, 2) NULL, 
    [Variation_Small] CHAR(1) NULL DEFAULT 'N', 
    [Variation_Regular] CHAR NULL, 
    [Variation_Large] CHAR NULL, 
    [IsTodaySpecial] CHAR NULL DEFAULT 'N', 
    [IsDiscountAvailable] CHAR NULL DEFAULT 'N', 
    [DiscountPercentage] SMALLINT NOT NULL
)