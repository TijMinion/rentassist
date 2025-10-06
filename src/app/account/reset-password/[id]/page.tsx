import { ResetPasswordContainer } from "@/app/account/reset-password/[id]/components/ResetPasswordContainer";

export default async function Page({ params }: { params: { id: string } }) {
    // const id = await params.id;
    const { id } = await params;
    return (
        <ResetPasswordContainer urlId={ id } />
    );
}

