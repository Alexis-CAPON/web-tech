
# Chat application - final project

Our online messaging application is called: ECE Chat <br/>
This application allow users to do : <br/>

* To authenticate itself using an external provider with Oauth.
* Navigate through his channels and the messages associated with the current channel.
* Send new messages.
* Edit and remove **his** messages.
* Create new channels
* Have a default profile image based on his name.
* Modify his settings.
* Trust the Chat application because it is secured and the resource access is verified.

**WARNING - USE SHOULD USE MOZILLA FIREFOX FOR A BETTER USE !**

## Usage

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/Alexis-CAPON/web-tech.git ecechat
  cd ecechat
  ```
* Use must have Docker installed on your machine (https://www.docker.com/products/docker-desktop) :)

* ( Optional ) Register your GitHub application, get the `clientID` and `clientSecret` from GitHub and report them to your Dex configuration. Modify the provided `./dex/config.yml` configuration to look like:
<br> Or you can use thoose provided !
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
      clientID: xxxx98f1c26493dbxxxx
      clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
      redirectURI: http://127.0.0.1:5556/dex/callback
  ```

<br> Inside `./dex/config.yml`, the front-end application is already registered and CORS is activated. Now that all is installed and configured, you can start docker ; becareful, you must start docker desktop on windows !

* Start docker 
  ```yaml
  docker compose up
  ```

* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Fill the database with initial data
  bin/init
  # Start the back-end
  yarn start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Start the front-end
  yarn start
  ```

## Author

Alexis CAPON : alexis.capon@edu.ece.fr <br>
Cyril PEREZ : cyril.perez@edu.ece.fr


## Tasks

Project management

* Naming convention   
  points: **2**<br/>
  comment: All developer conventions have been respected.

* Project structure   
  points: **4**<br/>
  comment: All the essential features are located in the src and the components allowing the creation of these are located in folders.

* Code quality   
  points: **4**<br/>
  comment: Good indentation, good readability.

* Design, UX   
  points: **4**<br/>
  comment: The user interface has been completely redesigned for ease of use as well as to increase the pleasure of use.

* Git and DevOps   
  points: **3**<br/>
  comment: Commits were done on a regular basis and the project uses docker.

Application development

* Welcome screens   
  points: **4**<br/>
  comment: A perfectly functional welcome screen, combining simplicity and efficiency. As well as a unique design. 

* New channel creation   
  points: **5**<br/>
  comment: A successful channel creation. A button integrated into the design, a popup, .. But the user cannot **yet** choose the people he wants to add to the channel.

* Channel membership and access<br/>
  points: **0**<br/>
  comment: Not enough time to implement this.

* Ressource access control   
  points: **4**<br/>
  comment: All the HTTP response return what was wanted, APIs, login secured, ...

* Invite users to channels<br/>
  points: **0**<br/>
  comment: Not enough time to implement this.

* Message modification   
  points: **1**<br/>
  comment: Bugs happen some time on this features, but all is implemented (UX, back-end).

* Message removal   
  points: **2**<br/>
  comment: A user can delete only his messages.

* Account settings   
  points: **2**<br/>
  comment: A settings page in the dashboard allowing the user to see his parameters. A avatar modification is semi-implemented (not finish).

* Gravatar integration   
  points: **0**<br/>
  comment: No use of "Gravatar".

* Avatar selection   
  points: **2**<br/>
  comment: We provide a default avatar based on the first letter of the username.

* Personal custom avatar   
  points: **2**<br/>
  comment: Implementation not finished on this feature, only UX and upload/input.

## Bonus

* Christmas music (on/off)