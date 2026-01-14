"use client";

import { DailyReport } from "@/app/api/(business)/reports/daily/models/DailyReport";
import { RequestStatus } from "@/app/api/types/RequestStatus";
import { DateUtils } from "@/src/lib/utils/date";
import { useEffect, useState } from "react";
import SectionHeader from "../../shared/SectionHeader";
import SummaryCard from "./SummaryCard";
import SummaryCardPrice from "./SummaryCardPrice";

export default function DailyReportSection() {
  const businessTime = new DateUtils().now();
  const [reportData, setReportData] = useState<DailyReport | null>(null);

  useEffect(() => {
    const obtainDailyReport = async () => {
      const response = await fetch("/api/reports/daily", {
        headers: {
          "market-id": localStorage.getItem("market-id")!,
        },
      });
      const { message, data } = await response.json();

      if (message === RequestStatus.SUCCESS) {
        setReportData(data);
      }
    };

    obtainDailyReport();
  }, []);

  return (
    <>
      {reportData ? (
        <div className='flex flex-col gap-2 bg-neutral-50'>
          {/* HEADER */}
          <SectionHeader title='Reporte diario' />
          <span className='text-xs text-neutral-500 ml-4'>
            {businessTime.date}
          </span>

          {/* SUMMARY CARDS */}
          <div className='grid grid-cols-2 gap-3 ml-4 mr-4'>
            <SummaryCard title='Ventas' amount={reportData.totalTransactions} />
            <SummaryCardPrice title='Ganancias' amount={reportData.totalAmount} />
          </div>

          {/* PRODUCTS SUMMARY */}
          <div className='rounded-lg bg-white border border-neutral-200 ml-4 mr-4'>
            <div className='px-4 py-2 border-b border-neutral-200 bg-neutral-200'>
              <span className='text-sm font-semibold text-neutral-800'>
                Ventas por producto
              </span>
            </div>

            <div className='divide-y divide-neutral-200 overflow-y-auto h-[50vh]'>
              {reportData.products.map((p) => (
                <div
                  key={p.productId}
                  className='grid grid-cols-[2fr_1fr_1fr] gap-3 px-4 py-3 text-sm'
                >
                  {/* Product */}
                  <span className='font-medium text-neutral-900 truncate'>
                    {p.name}
                  </span>

                  {/* Weight */}
                  <span className='text-right text-neutral-600'>
                    {p.totalWeight.toFixed(2)} kg
                  </span>

                  {/* Amount */}
                  <span className='text-right font-semibold text-neutral-900'>
                    $ {p.totalAmount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-2 bg-neutral-50'>
          <SectionHeader title='Reporte diario' />
          <span className='text-xs text-neutral-500 ml-4'>
            No hay reportes disponibles
          </span>
        </div>
      )}
    </>
  );
}
