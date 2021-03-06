import * as React from "react";
import { Link } from "react-router-dom";

export interface AllChirpsProps {}

export interface AllChirpsState {
  chirps: { id: string; user: string; text: string }[];
}

class AllChirps extends React.Component<AllChirpsProps, AllChirpsState> {
  constructor(props: AllChirpsProps) {
    super(props);
    this.state = {
      chirps: [],
    };
  }

  async componentWillMount() {
    let res = await fetch("/api/chirps");
    let chirps = await res.json();

    this.setState({ chirps });
  }

  render() {
    return (
      <>
        <div className="col-md-9">
          {this.state.chirps.map((chirp) => {
            return (
              <div key={chirp.id}>
                <Link to={`/details/${chirp.id}`}>
                  <div className="card p-2 m-3 shadow">
                    <div className="card-body">
                      <h4 className="card-title">{chirp.user}</h4>
                      <p className="card-text">{chirp.text}</p>
                    </div>
                  </div>
                </Link>
                <Link className="btn btn-blueCh" to={`/${chirp.id}/admin`}>
                  <div className="text-right">Options</div>
                </Link>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default AllChirps;
