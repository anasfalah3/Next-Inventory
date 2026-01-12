import { prisma } from "@/lib/prisma";
import Sidebar from "../components/sidebar";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage(){

      const user = await getCurrentUser();
      const userId = user.id;

      const totalProducts = await prisma.product.count({where:{userId}});

      const lowStock = await prisma.product.count({where:{userId}});
      const recent = await prisma.product.findMany({
            where:{userId},
            orderBy:{createdAt:"desc"},
            take:5,
      })
      console.log({totalProducts, lowStock, recent});

      return (
            <div className="min-h-screen bg-gray-50">
                  <Sidebar currentPath="/dashboard"/>
                  <main className="ml-64 p-8">
                        {/* Header */}
                        <div className="mb-8">
                              <div className="flex items-center justify-center">
                                    <div>
                                          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                                          <p className="text-sm text-gray-500">Welcome Back! Here is an overviw of your inventory</p>
                                    </div>
                              </div>
                        </div>


                        {/* Key Metrices */}
                  </main>
            </div>
      );
}