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
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f3f4f6;
            font-weight: bold;
        }

        .summary {
            background-color: #f0fdf4;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Daily Sales Report</h2>
        <p><strong>Date:</strong> {{ today()->format('F d, Y') }}</p>

        <div class="summary">
            <h3>Summary</h3>
            <p><strong>Total Orders:</strong> {{ $orders->count() }}</p>
            <p><strong>Total Revenue:</strong> ${{ number_format($orders->sum('total'), 2) }}</p>
        </div>

        <h3>Orders</h3>
        @foreach($orders as $order)
            <h4>Order #{{ $order->id }} - ${{ number_format($order->total, 2) }}</h4>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($order->items as $item)
                        <tr>
                            <td>{{ $item->product->name }}</td>
                            <td>{{ $item->quantity }}</td>
                            <td>${{ number_format($item->price, 2) }}</td>
                            <td>${{ number_format($item->price * $item->quantity, 2) }}</td>
                        </tr>
                    @endforeach>
                </tbody>
            </table>
        @endforeach>
    </div>
</body>

</html>