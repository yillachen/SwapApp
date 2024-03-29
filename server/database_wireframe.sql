﻿-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/wlXttY
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Customer" (
    "CustomerID" int   NOT NULL,
    "Username" string   NOT NULL,
    "FirstName" string   NOT NULL,
    "LastName" string   NOT NULL,
    "AddressID" int   NOT NULL,
    "Email" string   NOT NULL,
    "Phone" int   NULL,
    "ProfilePhoto" text   NULL,
    CONSTRAINT "pk_Customer" PRIMARY KEY (
        "CustomerID"
     )
);

CREATE TABLE "Address" (
    "AddressID" int   NOT NULL,
    "Address1" string   NOT NULL,
    "Address2" string   NULL,
    "Address3" string   NULL,
    "City" string   NOT NULL,
    "State" string   NOT NULL,
    "Zip" int   NOT NULL,
    "Country" string   NOT NULL,
    "Type" string   NOT NULL,
    CONSTRAINT "pk_Address" PRIMARY KEY (
        "AddressID"
     )
);

-- initially added timestamps
-- postgresql has native timestamps on creation
CREATE TABLE "Chat" (
    "ChatID" int   NOT NULL,
    "CustomerID" int   NOT NULL,
    "Name" string   NULL,
    CONSTRAINT "pk_Chat" PRIMARY KEY (
        "ChatID"
     )
);

CREATE TABLE "Message" (
    "MessageID" int   NOT NULL,
    "ChatID" int   NOT NULL,
    "Content" string   NOT NULL,
    CONSTRAINT "pk_Message" PRIMARY KEY (
        "MessageID"
     )
);

CREATE TABLE "Product" (
    "ProductID" int   NOT NULL,
    "Name" string   NOT NULL,
    "Description" varchar(2000)   NULL,
    "Condition" string   NOT NULL,
    "CategoryID" string   NULL,
    "CustomerID" int   NOT NULL,
    "Quantity" int   NOT NULL,
    "Live" boolean   NOT NULL,
    CONSTRAINT "pk_Product" PRIMARY KEY (
        "ProductID"
     )
);

CREATE TABLE "Category" (
    "CategoryID" int   NOT NULL,
    "Name" string   NOT NULL,
    CONSTRAINT "pk_Category" PRIMARY KEY (
        "CategoryID"
     )
);

CREATE TABLE "Swap" (
    "SwapID" int   NOT NULL,
    "SwapDate" string   NOT NULL,
    "CompletionDate" string   NOT NULL,
    CONSTRAINT "pk_Swap" PRIMARY KEY (
        "SwapID"
     )
);

CREATE TABLE "LineItem" (
    "LineItemID" int   NOT NULL,
    "SwapID" int   NOT NULL,
    "ProductID" int   NOT NULL,
    "Status" string   NOT NULL,
    CONSTRAINT "pk_LineItem" PRIMARY KEY (
        "LineItemID"
     )
);

ALTER TABLE "Customer" ADD CONSTRAINT "fk_Customer_AddressID" FOREIGN KEY("AddressID")
REFERENCES "Address" ("AddressID");

ALTER TABLE "Chat" ADD CONSTRAINT "fk_Chat_CustomerID" FOREIGN KEY("CustomerID")
REFERENCES "Customer" ("CustomerID");

ALTER TABLE "Message" ADD CONSTRAINT "fk_Message_ChatID" FOREIGN KEY("ChatID")
REFERENCES "Chat" ("ChatID");

ALTER TABLE "Product" ADD CONSTRAINT "fk_Product_CategoryID" FOREIGN KEY("CategoryID")
REFERENCES "Category" ("CategoryID");

ALTER TABLE "Product" ADD CONSTRAINT "fk_Product_CustomerID" FOREIGN KEY("CustomerID")
REFERENCES "Customer" ("CustomerID");

ALTER TABLE "LineItem" ADD CONSTRAINT "fk_LineItem_SwapID" FOREIGN KEY("SwapID")
REFERENCES "Swap" ("SwapID");

ALTER TABLE "LineItem" ADD CONSTRAINT "fk_LineItem_ProductID" FOREIGN KEY("ProductID")
REFERENCES "Product" ("ProductID");

