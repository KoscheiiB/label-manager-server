#### 1. Sales Trends Dashboard
### Overall Sales Over Time
SELECT date,
        math::sum(IF net_amount IS NULL THEN 0 ELSE net_amount END) AS total_sales,
        COUNT() AS total_transactions
FROM sales_reports
GROUP BY date
ORDER BY date ASC;


### Sales by Item Type:**
SELECT item_type,
        math::sum(IF item_type = 'payout' THEN 
           (IF item_total IS NULL THEN 0 ELSE item_total END) * -1 
        ELSE 
            (IF net_amount IS NULL THEN 0 ELSE net_amount END)
        END) AS total_value,
        COUNT(id) AS total_transactions
FROM sales_reports 
GROUP BY item_type;



### Transaction Fees Over Time:**
SELECT date, 
        math::sum(IF transaction_fee IS NULL THEN 0 ELSE transaction_fee END) AS total_fees 
FROM sales_reports 
GROUP BY date 
ORDER BY date ASC;


#### 2. Item Details Dashboard
### Top Selling Items

SELECT item_name, 
        math::sum(IF quantity IS NULL THEN 0 ELSE quantity END) AS quantity_sold, 
        math::sum(IF item_total IS NULL THEN 0 ELSE item_total END) AS total_revenue 
FROM sales_reports 
GROUP BY item_name 
ORDER BY quantity_sold DESC 
LIMIT 10;


##**Discount Usage Analysis:**
SELECT discount_code, 
        COUNT() AS usage_count 
FROM sales_reports 
WHERE discount_code IS NOT NULL 
GROUP BY discount_code 
ORDER BY usage_count DESC;


#### 3. Payment Summary Dashboard
##**Payments Received by Currency:**
SELECT currency, 
        math::sum(IF amount_you_received IS NULL THEN 0 ELSE amount_you_received END) AS total_received 
FROM sales_reports 
GROUP BY currency;



## **Shipping Costs and Revenue:**
SELECT math::sum(IF shipping IS NULL THEN 0 ELSE shipping END) AS total_shipping_costs, 
        math::sum(IF item_total IS NULL THEN 0 ELSE item_total END) AS total_revenue 
FROM sales_reports 
WHERE shipping IS NOT NULL;

##**Shipping Destination Analysis:**
SELECT ship_to_country, 
        COUNT() AS shipments 
FROM sales_reports 
GROUP BY ship_to_country;
