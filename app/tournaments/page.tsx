'use client'

import { CreateTournamentForm } from "@/src/components/CreateTournamentForm";
import { getAllTournaments } from "@/src/utils/getAllTournaments";
import { useEffect, useState } from "react";

import { TournamentList } from "./components/TournamentList";
import { PageHeader } from "@/src/components/PageHeader";

export default function Tournaments () {

    const [tournaments, setTournaments] = useState([]);

	const getTournaments = async () => {
		const allTournaments = await getAllTournaments();
        console.log({allTournaments})
		allTournaments && setTournaments(allTournaments.tournaments);
	};

	useEffect(() => {
		getTournaments();
	}, []);
    return (
        <div>
            <PageHeader title="All tournaments" />
            <TournamentList tournaments={tournaments} />
    </div>
    )
}