export type RecordProps = { [id: string]: number };

export type RecordComponentProps = {
	place: number;
	id: string;
	time: number;
	onAdd: (place: number) => void;
	onRemove: (id: string) => void;
};
