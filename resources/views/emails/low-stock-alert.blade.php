<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .alert {
            background-color: #fef2f2;
            border-left: 4px solid #dc2626;
            padding: 15px;
            margin: 20px 0;
        }

        .product-info {
            background-color: #f9fafb;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Low Stock Alert</h2>

        <div class="alert">
            <strong>Warning:</strong> A product is running low on stock!
        </div>

        <div class="product-info">
            <h3>{{ $product->name }}</h3>
            <p><strong>Current Stock:</strong> {{ $product->stock_quantity }} units</p>
            <p><strong>Price:</strong> ${{ number_format($product->price, 2) }}</p>
            @if($product->description)
                <p><strong>Description:</strong> {{ $product->description }}</p>
            @endif
        </div>

        <p>Please restock this product as soon as possible.</p>
    </div>
</body>

</html>