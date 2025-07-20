import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface companionsListProps {
    title: string,
    companions?: Companion[]
    className?: string
}
const CompanionsList = ({ title, companions, className }: companionsListProps) => {
    return (
        <article className={cn("companion-list", className)}>
            <h2 className='font-bold text-3xl'>Recent Sessions</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Lessons</TableHead>
                        <TableHead className='text-lg '>Subject</TableHead>
                        <TableHead className='text-lg text-right'>Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map((companion) => (
                        <TableRow key={companion.id}>
                            <TableCell>
                                <Link href={`/companions/${companion.id}`}>
                                    <div className='flex items-center gap-2'>
                                        <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden'>
                                            <Image src={`/icons/${companion.subject}.svg`} alt="subject" width={35} height={35} />
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    )
}

export default CompanionsList
