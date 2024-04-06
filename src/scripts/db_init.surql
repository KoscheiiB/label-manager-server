-- Define Namespace and Database
--DEFINE NAMESPACE label_manager_ns;
--DEFINE DATABASE ttr_sales_db;
USE NS label_manager_ns DB ttr_sales_db;

-- Define sales_reports Table with Schema
DEFINE TABLE sales_reports SCHEMAFULL;

-- Transaction Details
DEFINE FIELD date ON sales_reports TYPE option<datetime | null>; --option<datetime | null>; -- Transaction date
DEFINE FIELD currency ON sales_reports TYPE option<string | null>; -- Currency used
DEFINE FIELD transaction_fee ON sales_reports TYPE option<float | null>; -- Fee for the transaction
DEFINE FIELD fee_type ON sales_reports TYPE option<string | null>; -- Type of fee
DEFINE FIELD net_amount ON sales_reports TYPE option<float | null>; -- Net amount after fees

-- Item Details
DEFINE FIELD item_type ON sales_reports TYPE option<string | null>; -- Type of item sold
DEFINE FIELD item_name ON sales_reports TYPE option<string | null>; -- Name of the item
DEFINE FIELD artist ON sales_reports TYPE option<string | null>; -- Artist name if applicable
DEFINE FIELD item_price ON sales_reports TYPE option<float | null>; -- Price of the item
DEFINE FIELD quantity ON sales_reports TYPE option<float | null>; -- Quantity sold
DEFINE FIELD discount_code ON sales_reports TYPE option<string | null>; -- Discount code used
DEFINE FIELD sub_total ON sales_reports TYPE option<float | null>; -- Subtotal before shipping
DEFINE FIELD item_total ON sales_reports TYPE option<float | null>; -- Total for the item after discounts
DEFINE FIELD package ON sales_reports TYPE option<string | null>; -- Package type
DEFINE FIELD catalog_number ON sales_reports TYPE option<string | null>; -- Catalog number
DEFINE FIELD upc ON sales_reports TYPE option<string | null>; -- Universal Product Code
DEFINE FIELD isrc ON sales_reports TYPE option<string | null>; -- International Standard Recording Code
DEFINE FIELD sku ON sales_reports TYPE option<string | null>; -- Stock Keeping Unit

-- Payment Details
DEFINE FIELD paid_to ON sales_reports TYPE option<string | null>; -- Recipient of the payment
DEFINE FIELD bandcamp_transaction_id ON sales_reports TYPE option<string | number | null>; --option<string | null>; -- Bandcamp's transaction ID
DEFINE FIELD paypal_transaction_id ON sales_reports TYPE option<string | null>; -- PayPal's transaction ID
DEFINE FIELD amount_you_received ON sales_reports TYPE option<float | null>; -- Amount received after fees

-- Shipping Details
DEFINE FIELD shipping ON sales_reports TYPE option<float | null>; -- Shipping cost
DEFINE FIELD ship_from_country_name ON sales_reports TYPE option<string | null>; -- Shipping origin
DEFINE FIELD ship_to_name ON sales_reports TYPE option<string | null>; -- Recipient's name
DEFINE FIELD ship_to_street ON sales_reports TYPE option<string | null>; -- Shipping address
DEFINE FIELD ship_to_street_2 ON sales_reports TYPE option<string | null>;
DEFINE FIELD ship_to_city ON sales_reports TYPE option<string | null>;
DEFINE FIELD ship_to_state ON sales_reports TYPE option<string | null>;
DEFINE FIELD ship_to_zip ON sales_reports TYPE option<string | null>;
DEFINE FIELD ship_to_country ON sales_reports TYPE option<string | null>;
DEFINE FIELD ship_to_country_code ON sales_reports TYPE option<string | null>;
DEFINE FIELD ship_date ON sales_reports TYPE option<datetime | null>; -- Shipping date
DEFINE FIELD ship_notes ON sales_reports TYPE option<string | null>; -- Additional shipping notes

-- Buyer Details
DEFINE FIELD buyer_name ON sales_reports TYPE option<string | null>; -- Buyer's name
DEFINE FIELD buyer_email ON sales_reports TYPE option<string | null>; -- Buyer's email
DEFINE FIELD buyer_phone ON sales_reports TYPE option<string | null>; -- Buyer's phone number
DEFINE FIELD buyer_note ON sales_reports TYPE option<string | null>; -- Note from the buyer

-- Additional Details
DEFINE FIELD country ON sales_reports TYPE option<string | null>; -- Buyer's country
DEFINE FIELD country_code ON sales_reports TYPE option<string | null>; -- Country code
DEFINE FIELD region_or_state ON sales_reports TYPE option<string | null>; -- Buyer's region or state
DEFINE FIELD city ON sales_reports TYPE option<string | null>; -- Buyer's city
DEFINE FIELD referer ON sales_reports TYPE option<string | null>; -- Referrer
DEFINE FIELD referer_url ON sales_reports TYPE option<string | null>; -- Referrer URL
DEFINE FIELD item_url ON sales_reports TYPE option<string | null>; -- URL to the item
DEFINE FIELD option ON sales_reports TYPE option<string | null>; -- Any additional option

-- Taxation Details
DEFINE FIELD seller_tax ON sales_reports TYPE option<float | null>; -- Seller's tax amount
DEFINE FIELD marketplace_tax ON sales_reports TYPE option<float | null>; -- Marketplace tax amount
