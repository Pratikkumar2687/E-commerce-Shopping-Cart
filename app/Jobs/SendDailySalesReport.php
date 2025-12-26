<?php

namespace App\Jobs;

use App\Mail\DailySalesReport;
use App\Models\Order;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class SendDailySalesReport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $admin = User::where('is_admin', true)->first();

        if (!$admin) {
            return;
        }

        $orders = Order::with('items.product')
            ->whereDate('created_at', today())
            ->get();

        if ($orders->isEmpty()) {
            return;
        }

        Mail::to($admin->email)->send(new DailySalesReport($orders->toArray(), Carbon::today()));
    }
}
